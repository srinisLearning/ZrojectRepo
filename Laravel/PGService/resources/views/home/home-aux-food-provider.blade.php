 <table class='text-center'>
     <tr>
         <td>
 @php
 if(Auth::User()->isFoodProvider === 1)
 {
 print "<strong class='text-success'>" . date('d-M'). " - Food Delivery Details</strong><br />";
 $lunchDelivery = App\Models\MealBookingTable::where('provider_id', '=' ,Auth::id())->where('meal', '=', 'LUNCH')->whereDate('created_at', '=',Carbon\Carbon::today())->get();
 $dinnerDelivery= App\Models\MealBookingTable::where('provider_id', '=' ,Auth::id())->where('meal', '=', 'DINNER')->whereDate('created_at', '=',Carbon\Carbon::today())->get();
 print "Total Lunch = " .count($lunchDelivery) .'<br />';
 print "Total Dinner = " .count($dinnerDelivery); 

  
 }
 @endphp
 
  </td>
     </tr>
 </table>
  <strong> Lunch Order Details </strong>
  @if(!$lunchDelivery->isEmpty())
<table cellspacing="15" cellpadding="15">
 <thead>
     <tr>
         <th>Name</th>
         <th>Mobile</th>
     </tr>
     
 </thead>
 <tbody>

    @foreach($lunchDelivery as $meal)
     <tr>
         <td> 
           {{ App\Models\User::find($meal->consumer_id)->name }}
        </td>
        <td> 
            {{ App\Models\User::find($meal->consumer_id)->mobile }}
         </td>

     </tr>
    @endforeach
 </tbody>
 
</table>
@else
<br />
 No Lunch Booked
<br />
 @endif
<br />

<br />
<strong> Dinner Order Details </strong>
@if(!$dinnerDelivery->isEmpty())
<table cellspacing="15" cellpadding="15">
 <thead>
     <tr>
         <th>Name</th>
         <th>Mobile</th>
     </tr>
     
 </thead>
 <tbody>

    @foreach($dinnerDelivery as $meal)
     <tr>
         <td> 
           {{ App\Models\User::find($meal->consumer_id)->name }}
        </td>
        <td> 
            {{ App\Models\User::find($meal->consumer_id)->mobile }}
         </td>

     </tr>
    @endforeach
 </tbody>
 
</table>
@else
 <br />
 No Dinner Booked
 <br />

 @endif

 