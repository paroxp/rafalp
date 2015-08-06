@extends('layout.email')

@section('title', 'New message from ' . $contact->name)

@section('content')
    {!! nl2br($contact->message) !!}
@stop
