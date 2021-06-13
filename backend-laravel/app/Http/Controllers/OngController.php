<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ongs\CreateOngRequest;
use App\Http\Requests\Ongs\UpdateOngRequest;
use App\Models\Ong;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OngController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 15);
        $userId = $request->query('userId', null);

        $query = Ong::where('userId', '!=', 0);

        if ($userId != null)
            $query = $query->where('userId', '=', (int) $userId);

        $safeLimit = max(2, min(100, $limit));

        return Ong::simplePaginate($safeLimit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Requests\Ongs\CreateOngRequest  $request
     * @return \App\Models\Ong
     */
    public function store(Request $request, CreateOngRequest $store)
    {
        Log::debug(json_encode($request->user()));

        $entity = $request->user()->ongs()->create($store->validated());

        $entity->save();

        return $entity;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ong  $entity
     * @return \Illuminate\Http\Response
     */
    public function show(Ong $entity)
    {
        return $entity;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Requests\Ongs\UpdateOngRequest  $request
     * @param  \App\Models\Ong  $entity
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOngRequest $request, Ong $entity)
    {
        $entity->fill($request->validated());

        $onValidate = function () use ($entity) {
            $entity->save();

            return $entity;
        };

        if ($entity->userId === $request->user()->id)
            return $onValidate();

        if ($request->user()->isAdmin())
            return $onValidate();

        abort(403, 'Você não tem permissão para atualizar as informações dessa ONG.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ong  $entity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Ong $entity)
    {
        $onValidate = function () use ($entity) {
            $entity->delete();

            return response()->noContent();
        };

        if ($entity->userId === $request->user()->id)
            return $onValidate();

        if ($request->user()->isAdmin())
            return $onValidate();

        abort(403, 'Você não tem permissão para remover essa ONG.');
    }
}
