 
  <table class='text-center'>
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
        <td class='m-2'><a href='{{route('pg.edit',Auth::user()->property->id)}}' class='btn btn-pgservice btn-sm mr-2'>Edit</a>
        </td>
        <td>
            <form class="forms-sample" action="{{route('pg.destroy',Auth::user()->property->id)}}" method="post" >@csrf
                @method('DELETE')                     
                   <button type="submit" class="btn btn-pgservice btn-sm m-2 shadow">Delete</button>                            
            </form>
                           
        </td>
    </tr>

  </table>
 