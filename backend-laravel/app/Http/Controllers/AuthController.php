<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Authenticates by email and password
     */
    public function local(LoginRequest $request) {
        $validated = (object) $request->validated();

        $user = User::where('email', $validated->email)->first();

        if (!$user)
            abort(404, 'O usuário não existe ou foi deletado.');

        if (!Hash::check($validated->password, $user->password))
            abort(403, 'A senha não combina.');

        return [
            'token' => $user->createToken('bearer', ['roles:' . $user->roles])->plainTextToken,
        ];
    }
}
