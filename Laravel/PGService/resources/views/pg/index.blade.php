@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header"><h3 class='text-center'>Paying Guest Accomodation</h3></div>

                <div class="card-body">
                  
                     <div class="row">
                                   <div class="col-md-6 offset-md-2">
                                    <input class='form-control' placeholder='Enter Shop Name / Menu to Search' name='search' id='search' type='text' required>

                                   </div>
                                   <div class="col-md-2">
                                    <button type='submit'value='Search' class='btn btn-pgservice' > Search </button>
                                   </div>
                               </div>
                            </div>
                    <table class='table table-striped text-center'>   
                        <tr>
                            <th>Image</th>
                            <th>Location</th>
                            @if(Auth::check()) 
                            <th>Owner Info</th>
                            @endif
                            <th>Details</th>

                        </tr>
                        @if($data->isEmpty())
                       <tr>  

                        <td colspan='4'>

                           
                            <h3> There is no Property to show </h3>
                        

                        </td>

                       </tr>
                       @endif
                        @foreach($data as $one)

                      
                      
                        <tr>
                             
                            <td><img src="{{asset('images/'.$one->image)}}" width="400" height="200"/></td>
                            <td>
                                <small> City </small> <br /><strong>{{ $one->city}}</strong> <br /><br />
                            <small> Area</small> <br /> <strong>{{ $one->area}} </strong> <br /><br />
                            <small> Appartment Name </small>  <br /> <strong> {{ $one->ap_name }}</strong>  <br /><br />
                                <small>Landmark </small>  <br /> <strong> {{ $one->landmark }} </strong> <br /><br />
                            </td>
                            @if(Auth::check())
                            <td>
                             <small> Owner Name </small><br /> <strong>{{ $one->user->name }}</strong>  <br /> <br />
                             <small> Owner E-Mail </small><br /><strong>  {{ $one->user->email }}  </strong> <br /> <br />
                            <small> Owner Mobile </small><br /> <strong>  {{ $one->user->mobile }} </strong>   <br /> <br />  
                            <small> Owner  Aadhar No </small><br /> <strong>   {{ $one->certificate }}  </strong>   <br /> <br />        
                             
                            
                            </td>
                            @endif
                            <td>
                             <small>Facilites</small> <br /><strong> {{ $one->facilites  }}</strong> <br /><br />
                             @if($one->adl_info != null)
                             <small>Additional Information</small> <br /><strong> {{ $one->adl_info  }}</strong> <br /><br />
                             @endif
                             <small>No of Persons</small>  <br /><strong> {{ $one->persons}} </strong> <br /><br />
                            <small>Gender</small>  <br /><strong> {{ $one->gender  }}</strong> <br /><br />
                            @if($one->usertype != null)
                            <small>Family / Student </small> <br /> <strong> {{ $one->usertype}}</strong>  <br /><br />
                            @endif
                            <small>Rent </small>  <br />  <strong>{{ $one->rent}} </strong> <br /><br />
                           
                            </td>

                        </tr>
                        <tr>
                            <td colspan='4'>
                                @if(Auth::check()) 
                                    <a class='btn btn-pgservice' href="{{ route('pg-appointment',$one->user_id) }}">
                                        Fix Appointment
                                      </button>
                              
                                @endif
                            </td>

                        </tr>
                       
                       
@endforeach
                    
                    </table>
                    


                  

                    
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
 

<!-- JavaScript Bundle with Popper -->
 










 