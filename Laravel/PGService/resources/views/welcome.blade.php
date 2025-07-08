<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Service Mania</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
            a{
            text-decoration: none!important;
        }
        </style>
    </head>
    <body class="antialiased">
          @extends('layouts.app')
          @section('content')
           
            <h3 class='text-center'>hello guys & gals, <br />having a trouble finding paying guest accomodation or food services <br /> let us help you!
            </h3>
             <div class='card col-md-12 text-center shadow'>
                <div class='card-body'>
             <div class="row">
                 <div class="col-md-6 p-2">
                    <a class='text-bold' style='color:#4481e' href="{{ route('pg.index') }}"><h3>Paying Guest Accomodation</h3></a> 
                    <div style=font-size:18px;>
                        Looking for paying guest homes then, click on "Paying Guest Accomodation" in the menubar to  browse for pgs around you.<br />
                         Register and Login to Fix Appointment with the Property Owners  
                         <br />
                         <br />
                    </div>
                    <div class="text-center">
                        <img src="{{ asset('images/home/property.jpg')}}" class='rounded-circle shadow' width='300' height='300' />
                    </div>
                 </div>
                 <div class="col-md-6 p-2">
                    <a class='text-bold' style='color:#4481e' href="{{ route('fp.index') }}"><h3>Food Services</h3></a>  
                    <div style=font-size:18px;>               
                       Looking for healthy and home like meals than click on "Food Services" and you browse tasty eatiers in your neighborhood.<br />
                       Register and Login to Order Food.
                       <br /> 
                       <br />
                    </div>
                    <div class="text-center">
                        <img src="{{ asset('images/home/food.jpg')}}" width='300' height='300' class= 'rounded-circle shadow' />
                    </div>
                 </div>
             </div> 
                </div>
            </div>      
         
        @endsection

        <hr />
    </body>
      
</html>
