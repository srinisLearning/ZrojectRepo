@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card shadow">
                <div class="card-header"><h3 class="text-center">Food Service Providers</h3></div>

                <div class="card-body">
                    <div class='text-center mb-2'>
                        <form method="GET" action='{{ route('fp-search') }}'>
                            <div>
                                <div class="row">
                                    <div class="col-md-6 offset-md-2">
                                     <input class='form-control' placeholder='Enter Shop Name / Menu to Search' name='search' id='search' type='text' required>
 
                                    </div>
                                    <div class="col-md-2">
                                     <button type='submit'value='Search' class='btn btn-pgservice' > Search </button>
                                    </div>
                                </div>
                                                      
                          
                            </div>
                        </form>
                     </div>
                  
                    <table class='table text-center'>   
                        <tr p-2 m-2> 
                         <th>Food Image</th>
                         <th colspan='2'> Details</th>
                          
                         <th> Kitchen Image</th>
                        </tr>
                        @if($data->isEmpty())
                       <tr>  

                        <td colspan='4'>

                           
                            <h3> There is no Food Service Providers to show </h3>
                        

                        </td>

                       </tr>
                       @endif
                        @foreach($data as $one)
                        <tr>
                            <td><img class='rounded-circle' src="{{asset('images/'.$one->fp_food_img)}}" width="200" height="200"/></td>
                           
                            <td>
                                Shop Name : <strong>{{ $one->fp_name }} </strong> <br /> <br />
                                Name : {{ $one->user->name }} <br /><br />
                                @if(Auth::check())
                             E-Mail : {{ $one->user->email }} <br /><br />
                            Mobile : {{ $one->user->mobile }}<br /><br />
                            @endif
                                    
                             </td>
                             <td>               
                            Menu : {{ $one->fp_menu}}<br /><br />
                          
                           Price :  {{ $one->price}}<br /><br />  
                           @if(Auth::check())                         
                           <a href="{{  route('fp.bookMeal',[$one->user_id,"LUNCH"])}}" class='btn btn-pgservice'>Book Lunch </a>
                           <a href="{{  route('fp.bookMeal',[$one->user_id,"DINNER"])}}" class='btn btn-pgservice'>Book Dinner </a>
                          @endif
                             </td>
                          
                           </td>
                            <td><img class='rounded-circle' src="{{asset('images/'.$one->fp_kitchen_img)}}" width="200" height="200"/></td>

                            
                             
                        
                        
                        </td></tr>
@endforeach
                    
                    </table>
                    


                  

                    
                </div>
            </div>
        </div>
    </div>
</div>
 
@endsection










 