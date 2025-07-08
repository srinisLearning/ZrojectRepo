<div class="row m-3 text-center">
    <div class="col-md-6">

        @if(Auth::User()->isPGServiceProvider === 0)
        <a href='{{ route('ap.create') }} ' class='btn btn-lg btn-success p-1'>
        Register As Accomodation Provider
        </a>
        @else                          
         
          <table>
              <tr> 
                  <th colspan='2' class='text-info'> 
                    Paying Guest Accomodation
                  </th>
              </tr>
              <tr>
                  <td> Name</td>
                  <td> <strong>  {{  Auth::user()->property->ap_name }} </strong></td>
              </tr>
              <tr>
                <td> City</td>
                <td> <strong>  {{  Auth::user()->property->city}} </strong></td>
            </tr>
            <tr>
                <td> Area</td>
                <td> <strong>  {{  Auth::user()->property->area}} </strong></td>
            </tr>
            <tr>
                <td> Landmark</td>
                <td> <strong>  {{  Auth::user()->property->landmark}} </strong></td>
            </tr>
            <tr>
                <td> Persons</td>
                <td> <strong>  {{  Auth::user()->property->persons}} </strong></td>
            </tr>
            <tr>
                <td>Rent</td>
                <td> <strong>  {{  Auth::user()->property->rent}} </strong></td>
            </tr>
            <tr>
                <td> Gender</td>
                <td> <strong>  {{  Auth::user()->property->gender}} </strong></td>
            </tr>
            <tr>
                <td>User Type</td>
                <td> <strong>  {{  Auth::user()->property->usertype}} </strong></td>
            </tr>
            <tr>
                <td colspan='2'>
                    <img src="{{asset('images/'.Auth::user()->property->image )}}" width="200" height="100"/>
                </td>
            </tr>
            <tr>
                <td class='m-2'><a href='{{route('ap.edit',Auth::user()->property->id)}}' class='btn btn-primary btn-sm mr-2'>Edit</a>
                </td>
                <td>
                    <form class="forms-sample" action="{{route('ap.destroy',Auth::user()->property->id)}}" method="post" >@csrf
                        @method('DELETE')                     
                           <button type="submit" class="btn btn-danger btn-sm mr-2">Delete</button>                            
                    </form>
                                   
                </td>
            </tr>

          </table>
           
           
         
         @endif
    </div>
    <div class="col-md-6">
        @if(Auth::User()->isFoodProvider === 0)
        <a href='{{ route('fp.create') }} ' class='btn btn-lg btn-warning p-1'>
         Register as Food Provider
        </a>
        @else
      
        <table>
            <tr> 
                <th colspan='2' class='text-info'> 
                 Registered Food  details
                </th>
            </tr>
            <tr>
                <td> Name</td>
                <td> <strong> {{  Auth::User()->food->fp_name }} </strong></td>
            </tr>
            <tr>
              <td> Area</td>
              <td> <strong> {{  Auth::User()->food->fp_area }} </strong></td>
          </tr>
          <tr>
              <td>Menu</td>
              <td> <strong> {{  Auth::User()->food->fp_menu }} </strong></td>
          </tr>
          <tr>
              <td> Price</td>
               <td> <strong> {{  Auth::User()->food->price}} </strong></td>  
          </tr>
          <tr>
            <td colspan='2'>
                <img src="{{asset('images/'.Auth::user()->food->fp_food_img )}}" width="200" height="100"/>
            </td>
        </tr>
          <tr>
            <td class='m-2'><a href='{{route('fp.edit',Auth::user()->food->id)}}' class='btn btn-primary btn-sm m-2'>Edit</a>
            </td>
            <td>
                <form class="forms-sample" action="{{route('fp.destroy',Auth::user()->food->id)}}" method="post" >@csrf
                    @method('DELETE')                     
                       <button type="submit" class="btn btn-danger btn-sm m-2">Delete</button>                            
                </form>
                               
            </td>
        </tr>
          <tr>
              <td colspan='2'>
                  <br />
                @include('home.home-aux-food-provider')
              </td>

        </table>

        @endif
        @include('home.home-aux-food-consumer')
       
           
        </div>
     
</div>