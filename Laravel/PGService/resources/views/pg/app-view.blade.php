
 @php( $app =  \App\Models\AppointmentsTable::where('owner_id','=',Auth::id())->where('date', '<=', Carbon\Carbon::today())->orderBy('created_at', 'desc')->get())

@if(!$app->isEmpty())
 <table cellspacing="5" cellpadding="5">
     <thead>
         <tr>
             <th>Name</th>
             <th>Mobile</th>
             <th>Date</th>
             <th>Time</th>
            
         </tr>
     </thead>
     <tbody>
        @foreach($app as $one)
         <tr>
          <td> {{ App\Models\User::find($one->user_id)->name }}  </td>
          <td> {{ App\Models\User::find($one->user_id)->mobile }}  </td>
          <td> {{  $one->date   }}  </td>
          <td> {{ $one->time  }}  </td>
           
         </tr>
        
         @endforeach



        
     </tbody>   
 </table>

 @else

There are no appointments to show

@endif



 

 