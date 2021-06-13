<?php

namespace App\Http\Controllers;

use App\Http\Requests\Causes\CreateCauseRequest;
use App\Http\Requests\Causes\UpdateCauseRequest;
use App\Models\Cause;
use App\Models\Ong;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CauseController extends Controller
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
        $search = $request->query('search', null);
        $filterBy = $request->query('filterBy', null);
        $relations = $request->query('relations', null);
        $ongId = $request->query('ongId', null);

        $query = Cause::with($relations != null ? [$relations] : []);

        if ($search != null && $search != '')
            $query = $query->where('description', 'like', $search);

        if ($filterBy != null)
            $query = $query->where('expiresAt', $filterBy === 'expired' ? '<' : '>=', Carbon::now());

        if ($ongId != null)
            $query = $query->where('ongId', (int) $ongId);

        $safeLimit = max(2, min(100, $limit));

        return $query->simplePaginate($safeLimit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Requests\Causes\CreateCauseRequest  $request
     * @return \App\Models\Cause
     */
    public function store(Request $request, CreateCauseRequest $store)
    {
        $ong = Ong::find($store->get('ongId'));

        if ($ong == null)
            abort(404, 'A ong enviada não foi encontrada.');

        $onValidate = function () use ($ong, $store) {
            $entity = $ong->causes()->create($store->validated());
            $entity->save();

            return $entity;
        };

        if ($ong->userId === $request->user()->id)
            return $onValidate();

        if ($request->user()->isAdmin())
            return $onValidate();

        abort(403, 'Você não tem permissão para criar uma Causa para essa ONG.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cause  $entity
     * @return \Illuminate\Http\Response
     */
    public function show(Cause $entity)
    {
        return $entity;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Requests\Causes\UpdateCauseRequest  $request
     * @param  \App\Models\Cause  $entity
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCauseRequest $request, Cause $entity)
    {
        $entity->loadMissing('ong');
        $entity->fill($request->validated());

        $onValidate = function () use ($entity) {
            $entity->save();

            return $entity;
        };

        if ($entity->ong->userId === $request->user()->id)
            return $onValidate();

        if ($request->user()->isAdmin())
            return $onValidate();

        abort(403, 'Você não tem permissão para atualizar as informações dessa ONG.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cause  $entity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Cause $entity)
    {
        $entity->loadMissing('ong');
        $onValidate = function () use ($entity) {
            $entity->delete();

            return response()->noContent();
        };

        if ($entity->ong->userId === $request->user()->id)
            return $onValidate();

        if ($request->user()->isAdmin())
            return $onValidate();

        abort(403, 'Você não tem permissão para remover essa causa.');
    }
}
