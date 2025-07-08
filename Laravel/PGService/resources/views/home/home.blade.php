@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card shadow">
                <div class="card-header text-center"><h3>{{ __('User Profile') }}</h3></div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    @if(Session::has('message'))
                    <div class="alert bg-success alert-success text-white" role="alert">
                        {{Session::get('message')}}
                    </div>
                @endif

                    <div class="row m-4 p-4 border border-1 border-success">
                        <div class="col-md-3">Name : <br /> {{ Auth::User()->name}}</div>
                        <div class="col-md-3">E-Mail :<br /> {{ Auth::User()->email}}</div>
                        <div class="col-md-3">Mobile : <br />{{ Auth::User()->mobile}}</div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-pgservice" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Edit User
                              </button> 

                        </div>
                    <div>
                      
                    </div>
                    </div>

                     <div class="row">
                         <div class="col-md-6 p-2 text-center mx-auto">
                            @if(Auth::User()->isPGServiceProvider === 0)
                            <a href='{{ route('pg.create') }} ' class='btn btn-lg btn-pgservice  p-1'>
                                Register As Accomodation Provider
                                </a>                            
                             @else
                             <div class='text-center ml-5'>
                             @include('home.home-property')
                             </div>
                             <br />
                             <h6><strong>Appointments</strong></h6>
                             @include('pg.app-view')
                             @endif
                             <br />
                             
                            </div>
                            <div class="col-md-6 p-2 text-center">
                             @if(Auth::User()->isFoodProvider === 0)
                                 <a href='{{ route('fp.create') }} ' class='btn btn-lg btn-pgservice p-1'>
                                  Register as Food Provider
                                  </a>
                               @else
                               @include('home.home-food')
                               <br />
                                
                               @include('home.home-aux-food-provider')
                               @endif
                               @include('home.home-aux-food-consumer')
                             
                            
                         </div>
                          
                     </div>
                      
                      @include('home.edituser-model')


                  

                    
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
