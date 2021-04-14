<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!$request->user()->isAdmin())
            abort(403, 'Você não tem permissão para listar todos os usuários.');

        $limit = $request->query('limit', 15);
        $safeLimit = max(2, min(100, $limit));

        return User::simplePaginate($safeLimit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Users\CreateUserRequest  $request
     * @return \App\Models\User
     */
    public function store(CreateUserRequest $request)
    {
        $user = User::create($request->validated());
        $user->password = Hash::make($user->password);

        $user->save();

        return $user;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Models\User
     */
    public function me(Request $request)
    {
        return $request->user();
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, User $user)
    {
        if ($user->id === $request->user()->id)
            return $user;

        if ($request->user()->isAdmin())
            return $user;

        abort(403, 'Você não tem permissão para visualizar as informações desse usuário.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Requests\Users\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->fill($request->validated());

        $onValidate = function () use ($user) {
            $user->save();

            return $user;
        };

        if ($user->id === $request->user()->id)
            return $onValidate();

        if ($request->user()->isAdmin())
            return $onValidate();

        abort(403, 'Você não tem permissão para atualizar as informações desse usuário.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, User $user)
    {
        $onValidate = function () use ($user) {
            $user->tokens()->delete();
            $user->delete();
        };

        if ($user->id === $request->user()->id)
            return $onValidate();

        if ($request->user()->isAdmin())
            return $onValidate();

        abort(403, 'Você não tem permissão para remover esse usuário.');

    }
}
