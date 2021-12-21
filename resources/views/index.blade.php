@extends('layouts.template')

@section('title', 'Contacts')

<!-- content -->
@section('content')

    <div class="container">
        <div class="row mt-5">
            <a href="{{ route('contacts.create') }}" class="btn btn-success col-lg-2 col-md-2 col-sm-3">Create</a>
        </div>

        <div class="row mt-5">
            <table class="table table-striped table-sm table-md table-lg ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($contacts as $contact)
                        <tr>
                            <th scope="row">{{ $contact->id }}</th>
                            <td>{{ $contact->name }}</td>
                            <td>{{ $contact->contact }}</td>
                            <td>{{ $contact->email }}</td>

                            <td>
                                <a href="{{ route('contacts.edit', $contact->id) }}" class="btn btn-primary"><i
                                        class="fas fa-edit"></i></a>
                                <a href="{{ route('contacts.show', $contact->id) }}" class="btn btn-primary"><i
                                        class="fas fa-eye"></i></a>

                                <button type="submit" class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#delete-modal"><i class="far fa-trash-alt"></i></button>
                                </form>
                            </td>
                        </tr>
                    @endforeach

                </tbody>
            </table>

        </div>

        <div class="d-flex justify-content-center  ">

            {{-- paginate --}}
            <div class="row">
                <div class="col-lg-12 ">
                    <h3> {{ $contacts->links() }}</h3>
                </div>
            </div>

        </div>


    </div>

    @include('contacts.delete_modal')
    @include('contacts.show_modal')
@endsection
<!-- end content -->
