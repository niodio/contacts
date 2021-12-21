@extends('layouts.template')

@section('title', 'Contacts')

<!-- content -->
@section('content')

    <div class="container">
        <div class="row mt-5">
            <a href="{{ route('contacts.index') }}" class="btn btn-success col-lg-2 col-md-2 col-sm-3">Voltar</a>
        </div>


        <div class="d-flex row mt-5 border">
            <img src="{{ asset('img/default.jpg') }}" alt="perfil" style="width: 7rem">

            <div class="col-lg-10 col-md-10 col-sm-10">
                <h3>{{ $contact->name }}</h3>
                <p>{{ $contact->contact }}</p>
                <p>{{ $contact->email }}</p>



            </div>
        </div>




    </div>






    @include('contacts.delete_modal')
    @include('contacts.show_modal')
@endsection
<!-- end content -->
