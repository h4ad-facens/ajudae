<?php

namespace App\Http\Requests\Ongs;

use Illuminate\Foundation\Http\FormRequest;

class CreateOngRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return !!$this->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'color' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'whatsapp' => 'required|string|max:255',
        ];
    }
}
