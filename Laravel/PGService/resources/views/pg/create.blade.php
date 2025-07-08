@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register Accomodation Provider') }}</div>

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
                        <div class="col-md-4">Name : {{ Auth::User()->name}}</div>
                        <div class="col-md-4">E-Mail : {{ Auth::User()->email}}</div>
                        <div class="col-md-4">Mobile : {{ Auth::User()->mobile}}</div>
                    </div>
                    <form method="POST" action="{{ route('pg.store') }}" enctype="multipart/form-data">
                        @csrf

                        <div class="row mb-3">
                            <label for="ap_name" class="col-md-4 col-form-label text-md-end">{{ __('Appartment Name') }}</label>

                            <div class="col-md-6">
                                <input id="ap_name" type="text" class="form-control @error('ap_name') is-invalid @enderror" name="ap_name" value="{{ old('ap_name') }}" required autocomplete="ap_name" autofocus>

                                @error('ap_name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ap_city" class="col-md-4 col-form-label text-md-end">{{ __('City') }}</label>
                            <div class="col-md-6">
                                <input id="ap_city" type="text" class="form-control @error('ap_city') is-invalid @enderror" name="ap_city" value="{{ old('ap_city') }}" required autocomplete="ap_city" autofocus>

                                @error('ap_city')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ap_area" class="col-md-4 col-form-label text-md-end">{{ __('Area / Locality') }}</label>
                            <div class="col-md-6">
                                <input id="ap_area" type="text" class="form-control @error('ap_area') is-invalid @enderror" name="ap_area" value="{{ old('ap_area') }}" required autocomplete="ap_area" autofocus>

                                @error('ap_area')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ap_landmark" class="col-md-4 col-form-label text-md-end">{{ __('Lankmark ') }}</label>
                            <div class="col-md-6">
                                <input id="ap_landkmark" type="text" class="form-control @error('ap_landmark') is-invalid @enderror" name="ap_landmark" value="{{ old('ap_landmark') }}" required autocomplete="ap_landmark" autofocus>

                                @error('ap_landmark')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                       
                    
                    <div class="row mb-3">
                        <label for="ap_facilites" class="col-md-4 col-form-label text-md-end">{{ __('Facilites ') }}</label>
                        <div class="col-md-6">
                            <input type="checkbox" checked name="facilites[]" value="RO Water"> RO Water  
                            <input type="checkbox" name="facilites[]" value="Water Heater"> Water Heater 
                            <input type="checkbox" name="facilites[]" value="Laundry"> Laundry  
                            <input type="checkbox" name="facilites[]" value="Room Cleaning"> Room Cleaning

                            @error('ap_facilites')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="ap_adl_info" class="col-md-4 col-form-label text-md-end">{{ __('Additional Information ') }} <sup>*</sup></label>
                        <div class="col-md-6">
                            <input id="ap_adl_info" type="text" class="form-control @error('ap_adl_info') is-invalid @enderror" name="ap_adl_info" value="{{ old('ap_adl_info') }}"  autocomplete="ap_adl_info" autofocus>

                            @error('ap_adl_info')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>

                        <div class="row mb-3">
                            <label for="ap_persons" class="col-md-4 col-form-label text-md-end">{{ __('No of Persons') }}</label>
                            <div class="col-md-6">
                                <input id="ap_persons" type="text" class="form-control @error('ap_persons') is-invalid @enderror" name="ap_persons" value="{{ old('ap_persons') }}" required autocomplete="ap_persons" autofocus>

                                @error('ap_persons')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class='row mb-3'>
                            <label for="ap_gender" class="col-md-4 col-form-label text-md-end">{{ __('Gender') }}</label>
                             <div class='col-md-6'>
                                 <select class='form-control' name='ap_gender' id='ap_gender' required>
                                 <option disabled selected value>Select Option</option>  
                                 <option value='Only Male'>Only Male</option>
                                 <option value='Only Female'>Only Female</option>
                                 <option value='Male & Female'>Male & Female</option>
                                 </select>                       
                              </div>
                        </div>
                        <div class='row mb-3'>
                            <label for="ap_usertype" class="col-md-4 col-form-label text-md-end">{{ __('Student / Family' ) }}<sup>*</sup></label>
                             <div class='col-md-6'>
                                 <select class='form-control' name='ap_usertype' id='ap_usertype'>
                                 <option disabled selected value>Select Option</option>    
                                 <option value='Student'>Student</option>
                                 <option value='Family'>Family</option>
                                
                                 </select> 
                                                    
                              </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ap_rent" class="col-md-4 col-form-label text-md-end">{{ __('Rent') }}</label>
                            <div class="col-md-6">
                                <input id="ap_rent" type="text" class="form-control @error('ap_rent') is-invalid @enderror" name="ap_rent" value="{{ old('ap_rent') }}" required autocomplete="ap_rent" autofocus>

                                @error('ap_rent')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ap_certificate" class="col-md-4 col-form-label text-md-end">{{ __('Adahar Number') }}</label>
                            <div class="col-md-6">
                                <input id="ap_certificate" maxlength='12'  type="text" class="form-control @error('ap_certificate') is-invalid @enderror" name="ap_certificate" value="{{ old('ap_certificate') }}" required autocomplete="ap_certificate" autofocus>

                                @error('ap_certificate')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ap_img" class="col-md-4 col-form-label text-md-end">{{ __('Image') }}</label>
                            <div class="col-md-6">
                                <input id="ap_img" type="file" class="form-control @error('ap_img') is-invalid @enderror" name="ap_img" value="{{ old('ap_img') }}" required autocomplete="ap_img" autofocus>

                                @error('ap_img')
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
