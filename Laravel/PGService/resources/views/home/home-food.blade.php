@if(Auth::User()->isFoodProvider === 0)
        <a href='{{ route('fp.create') }} ' class='btn btn-lg btn-pgservice p-1 shadow'>
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
            <td class='m-2'><a href='{{route('fp.edit',Auth::user()->food->id)}}' class='shadow btn btn-primary btn-sm m-2'>Edit</a>
            </td>
            <td>
                <form class="forms-sample" action="{{route('fp.destroy',Auth::user()->food->id)}}" method="post" >@csrf
                    @method('DELETE')                     
                       <button type="submit" class="shadow btn btn-danger btn-sm m-2">Delete</button>                            
                </form>
                               
            </td>
        </tr>
          <tr>
              <td colspan='2'>
                  <br />
               
              </td>

        </table>

        @endif
        