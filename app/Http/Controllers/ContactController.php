<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactModel;

class ContactController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        

        // pagination
        $contacts = ContactModel::paginate(5);

        return view('index', compact('contacts'));
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // show form for creating new contact
        return view('contacts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // message 
        $message = [
            'name.required' => 'Name is required',
            'name.min' => 'Name must be at least 5 characters',
            'email.required' => 'Email is required',
            'email.email' => 'Email is not valid',
            'contact.required' => 'Contact is required',
            'contact.numeric' => 'Contact is not a number',
            'contact.digits' => 'Contact is not a number',
            'contact.min' => 'Contact is not a 9 digit number minimum',
            'contact.max' => 'Contact is not a 9 digit number maximum',
        ];

        // validation
        $request->validate( [
            'name' => 'required|min:5|max:255|string',
            'email' => 'required|email|unique:contacts',
            'contact' => 'required|digits:9|unique:contacts',
        ], $message);

        // store data to database
        $contact = new ContactModel;
        $contact->name = $request->name;
        $contact->contact = $request->contact;
        $contact->email = $request->email;
        $contact->save();

        // return response with error message if failed
        return redirect()
        ->route('contacts.create')
        ->withInput();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // show data from database
        $contact = ContactModel::find($id);

        return view('contacts.show', [
            'contact' => $contact
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        // delete data from database
        $contact = ContactModel::find($request->id);
        $contact->delete();
        return redirect('/');
    }

}
