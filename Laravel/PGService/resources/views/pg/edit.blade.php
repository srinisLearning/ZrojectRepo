
 
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Edit Accomodation Provider') }}</div>

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
                    <form method="POST" action="{{ route('pg.update',$data->id) }}" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')   
                        <div class="row mb-3">
                            <label for="ap_name" class="col-md-4 col-form-label text-md-end">{{ __('Appartment Name') }}</label>

                            <div class="col-md-6">
                                <input id="ap_name" type="text" class="form-control @error('ap_name') is-invalid @enderror" name="ap_name" value="{{ $data->ap_name}}" required autocomplete="ap_name" autofocus>

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
                                <input id="ap_city" type="text" class="form-control @error('ap_city') is-invalid @enderror" name="ap_city" value="{{ $data->city}}" required autocomplete="ap_city" autofocus>

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
                                <input id="ap_area" type="text" class="form-control @error('ap_area') is-invalid @enderror" name="ap_area" value="{{ $data->area }}" required autocomplete="ap_area" autofocus>

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
                                <input id="ap_lankmark" type="text" class="form-control @error('ap_landmark') is-invalid @enderror" name="ap_landmark" value="{{ $data->landmark }}" required autocomplete="ap_landmark" autofocus>

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
                            <input type="checkbox" {{ Str::of($data->facilites)->contains('RO Water')?'checked':'' }} name="facilites[]" value="RO Water"> RO Water  
                            <input type="checkbox" {{ Str::of($data->facilites)->contains('Water Heater')?'checked':'' }} name="facilites[]" value="Water Heater"> Water Heater
                            <input type="checkbox" {{ Str::of($data->facilites)->contains('Laundry')?'checked':'' }}  name="facilites[]" value="Laundry"> Laundry  
                            <input type="checkbox" {{ Str::of($data->facilites)->contains('Room Cleaning')?'checked':'' }}  name="facilites[]" value="Room Cleaning"> Room Cleaning

                            @error('ap_facilites')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                     
                        <div class="row mb-3">
                            <label for="ap_adl_info" class="col-md-4 col-form-label text-md-end">{{ __('Additional Information') }} <sup>*</sup></label>
                            <div class="col-md-6">
                                <input id="ap_adl_info" type="text" class="form-control @error('ap_adl_info') is-invalid @enderror" name="ap_adl_info" value="{{ $data->ap_adl_info}}"  autocomplete="ap_adl_info" autofocus>

                                @error('ap_adl_info')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                    

                        <div class="row mb-3">
                            <label for="ap_img" class="col-md-4 col-form-label text-md-end">{{ __('Image') }}</label>
                            <div class="col-md-6">
                                <input id="ap_img" type="file" placeholder='optional' class="form-control @error('ap_img') is-invalid @enderror" name="ap_img" value="{{ $data->image}}" autocomplete="ap_img" autofocus>

                                @error('ap_img')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ap_persons" class="col-md-4 col-form-label text-md-end">{{ __('No of Persons') }}</label>
                            <div class="col-md-6">
                                <input id="ap_persons" type="text" class="form-control @error('ap_persons') is-invalid @enderror" name="ap_persons" value="{{ $data->persons }}" required autocomplete="ap_persons" autofocus>

                                @error('ap_persons')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ap_rent" class="col-md-4 col-form-label text-md-end">{{ __('Rent') }}</label>
                            <div class="col-md-6">
                                <input id="ap_rent" type="text" class="form-control @error('ap_rent') is-invalid @enderror" name="ap_rent" value="{{ $data->rent }}" required autocomplete="ap_rent" autofocus>

                                @error('ap_rent')
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
                                 <option {{ $data->gender ==="Only Male"? 'Selected' :'' }} value='Only Male'>Only Male</option>
                                 <option {{ $data->gender ==="Only Female"? 'Selected' :'' }} value='Only Female'>Only Female</option>
                                 <option {{ $data->gender ==="Male & Female"? 'Selected' :'' }} value='Both'>Male & Female</option>
                                 </select>                       
                              </div>
                        </div>
                        <div class='row mb-3'>
                            <label for="ap_usertype" class="col-md-4 col-form-label text-md-end">{{ __('Student / Family') }}<sup>*</sup></label>
                             <div class='col-md-6'>
                                 <select class='form-control' name='ap_usertype' id='ap_usertype'>
                                 <option disabled selected value>Select Option</option> 
                                 <option {{ $data->usertype ==="Student"? 'Selected' :'' }}  value='Student'>Student</option>
                                 <option {{ $data->usertype ==="Family"? 'Selected' :'' }} value='Family'>Family</option>
                                
                                 </select>                       
                              </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ap_certificate" class="col-md-4 col-form-label text-md-end">{{ __('Aadhar Number') }}</label>
                            <div class="col-md-6">
                                <input id="ap_certificate" maxlength='12' type="text" class="form-control @error('ap_certificate') is-invalid @enderror" name="ap_certificate" value="{{ $data->certificate }}" required autocomplete="ap_certificate" autofocus>

                                @error('ap_certificate')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('UPDATE') }}
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
