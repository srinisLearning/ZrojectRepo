
@php
$lunchDelivery = App\Models\MealBookingTable::where('consumer_id', '=' ,Auth::id())->where('meal', '=', 'LUNCH')->whereDate('created_at', '=',Carbon\Carbon::today())->get();
$dinnerDelivery= App\Models\MealBookingTable::where('consumer_id', '=' ,Auth::id())->where('meal', '=', 'DINNER')->whereDate('created_at', '=',Carbon\Carbon::today())->get();
 
@endphp

@if(count($lunchDelivery)>0)
<br />
<br />
<strong class='btn btn-warning' style='cursor:auto'>{{ count($lunchDelivery)  }}&nbsp;&nbsp;Lunch Booked </strong>
<br />
<br />
@endif

@if(count($dinnerDelivery)>0)
<strong class='btn btn-success' style='cursor:auto'>{{ count($dinnerDelivery)  }}&nbsp;&nbsp;Dinner Booked </strong>
@endif