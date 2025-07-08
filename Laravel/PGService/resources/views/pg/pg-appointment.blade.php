@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{ __('Paying Guest Appointment Booking') }}</div>

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
                      <div class="col-md-5 offset-1 text-center">
                        <h6>User Information</h6>
                        Name :   {{ Auth::User()->name}} <br />
                        E-Mail :  {{ Auth::User()->email}} <br />
                        Mobile :  {{ Auth::User()->mobile}}
                      </div>
                      <div class="col-md-5">
                        <h6>Owner Information</h6>
                        Id: {{ $user->id }}<br/>
                        Name :   {{ $user->name}} <br />
                        E-Mail :  {{ $user->email}} <br />
                        Mobile :  {{ $user->mobile}} <br />            
                     
                      </div>               
                    </div>

             
                         <div class="row m-4 p-4 border border-1 border-success">
                          <div class="col-md-4 offset-4 text-center">
                           <form method='POST' action={{ route('store-app')  }}>
                            @csrf
                             <div class='m-3'>
                             <input name ='owner_id' hidden type=text value={{ $user->id }} readonly /> 
                             </div>
                             <div class='m-3'>
                              Date &nbsp;&nbsp;  <input id='app_date' name='app_date' type='date' required> 
                             </div>
                             <div class='m-3'>
                              Time &nbsp;&nbsp;  <input name='app_time' type='time' required>
                             </div>
                             </select>

                             <div class="row mb-0">
                              <div class="col-md-6 offset-md-4">
                                  <button type="submit" class="btn btn-primary">
                                      {{ __('Fix Appointment') }}
                                  </button>
                              </div>
                          </div>

                           </form>
                          </div>

                         </div>
                   


                  

                
            </div><!-- end of card -->
        </div>
    </div>
</div>
 
@endsection
<script> 
 $(function(){
    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    var maxDate = year + '-' + month + '-' + day;
   
  //  $('#app_date').attr('min', maxDate);
});
</script>