@extends('layouts.template')

@section('title', 'Create New Contact')


<!-- content -->
@section('content')
    <div class="container-fluid mt-5 bg-dark">
        <div class="d-flex justify-content-center align-items-center">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="text-light">Create New Contact</h1>
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>

                        @endif

                        <form action="{{ route('contacts.store') }}" method="POST" class="text-light">
                            @csrf

                            <div class="form-row align-items-center">
                                <div class="col-auto">
                                    <label>Name </label>
                                    <input type="text" id="name" name="name" placeholder="Name"
                                        class=" form-control mb-2 @error('name') is-invalid @enderror"
                                        value=" ">
                                    @error('name')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror

                                </div>

                                <div class="col-auto">
                                    <label>Contact</label>
                                    <input type="tel" id="contact" name="contact" placeholder="Contact"
                                        class=" form-control mb-2 @error('contact') is-invalid @enderror">
                                    @error('contact')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                </div>

                                <div class="col-auto">
                                    <label>Email</label>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text ">@</div>
                                        </div>
                                        <input type="email" id="email" name="email" placeholder="Email"
                                            class=" form-control mb-2 @error('email') is-invalid @enderror">
                                        @error('email')
                                            <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-auto">
                                    <button type="submit" class="btn btn-primary mb-2 col-lg-12">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
<!-- end content -->
