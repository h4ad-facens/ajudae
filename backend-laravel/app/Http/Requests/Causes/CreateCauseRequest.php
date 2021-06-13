<?php

namespace App\Http\Requests\Causes;

use Illuminate\Foundation\Http\FormRequest;

class CreateCauseRequest extends FormRequest
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
            'categories' => 'required|string|max:255',
            'description' => 'required|string|max:1024',
            'expiresAt' => 'required|date',
            'ongId' => 'required|integer',
        ];
    }
}
