@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register Food Provider') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    @if(session::has('messsage'))                    
                    <div class="alert bg-success alert-success text-white" role="alert">
                        <button  type='button' class='close' data-dismiss='alert' >x</button>
                        {{session::get('message')}}
                    </div>
                     @endif
                     @if($errors->any())
                     <div class="alert bg-danger  alert-danger text-white" role="alert">
                          <h4>{{$errors->first()}}</h4>
                     </div>    
                     @endif
                      
                  
                    <div class="row m-4 p-4 border border-1 border-success">
                        <div class="col-md-4">Name : {{ Auth::User()->name}}</div>
                        <div class="col-md-4">E-Mail : {{ Auth::User()->email}}</div>
                        <div class="col-md-4">Mobile : {{ Auth::User()->mobile}}</div>
                    </div>
                    <form method="POST" action="{{ route('fp.store') }}" enctype="multipart/form-data">
                        @csrf

                        <div class="row mb-3">
                            <label for="fp_name" class="col-md-4 col-form-label text-md-end">{{ __('Food Service Name') }}</label>

                            <div class="col-md-6">
                                <input id="fp_name" type="text" class="form-control @error('fp_name') is-invalid @enderror" name="fp_name" value="{{ old('fp_name') }}" required autocomplete="fp_name" autofocus>

                                @error('fp_name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="fp_area" class="col-md-4 col-form-label text-md-end">{{ __('Area / Locality ') }}</label>
                            <div class="col-md-6">
                                <input id="fp_area" type="text" class="form-control @error('fp_area') is-invalid @enderror" name="fp_area" value="{{ old('fp_area') }}" required autocomplete="fp_area" autofocus>

                                @error('fp_area')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="fp_landmark" class="col-md-4 col-form-label text-md-end">{{ __('Landmark') }}</label>
                            <div class="col-md-6">
                                <input id="fp_landmark" type="text" class="form-control @error('fp_landmark') is-invalid @enderror" name="fp_landmark" value="{{ old('ap_address1') }}" required autocomplete="ap_landmark" autofocus>

                                @error('fp_landmark')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="fp_menu" class="col-md-4 col-form-label text-md-end">{{ __('Menu') }}</label>
                            <div class="col-md-6">
                                <input id="fp_menu" type="text" class="form-control @error('fp_menu') is-invalid @enderror" name="fp_menu" value="{{ old('ap_menu') }}" required autocomplete="app_menu" autofocus>

                                @error('fp_menu')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="fp_price" class="col-md-4 col-form-label text-md-end">{{ __('Price') }}</label>
                            <div class="col-md-6">
                                <input id="fp_price" type="text" class="form-control @error('fp_price') is-invalid @enderror" name="fp_price" value="{{ old('fp_price') }}" required autocomplete="fp_price" autofocus>

                                @error('fp_price')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="fp_food_img" class="col-md-4 col-form-label text-md-end">{{ __('Food Image') }}</label>
                            <div class="col-md-6">
                                <input id="fp_food_img" type="file" class="form-control @error('fp_food_img') is-invalid @enderror" name="fp_food_img" value="{{ old('fp_food_img') }}" required autocomplete="fp_food_img" autofocus>

                                @error('fp_food_img')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="fp_kitchen_img" class="col-md-4 col-form-label text-md-end">{{ __('Kitchen Image') }}</label>
                            <div class="col-md-6">
                                <input id="fp_kitchen_img" type="file" class="form-control @error('fp_kitchen_img') is-invalid @enderror" name="fp_kitchen_img" value="{{ old('fp_kitchen_img') }}" required autocomplete="fp_kitchen_img" autofocus>

                                @error('fp_kitchen_img')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>

                    </form>

                     

                    
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
