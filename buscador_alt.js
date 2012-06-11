
var cond = false , texto = 0 , par , c_el = false , w_res = "" , id = 2 , fil , temp , key = 0 , comand = 0 , params = 0;

 (function($){


     var json_bus = function(params){


         obj = params.obj;

         fil = obj.find("div.arr_d .act").length == 0 ? "Clientes" : $("div.arr_d .act").text();

         switch(fil.toLowerCase()){

             case "clientes" :

                 id = 2;
                temp =  obj.find("div.arr_d ul li:first");
                temp.addClass("act");

              break;

             case "facturas" :

                 id = 3;
                 obj.find("div.arr_d ul li:last").addClass("act");

              break;


         }


         this.params = {

             url : "apps/buscar.php",
             data : {q : "" , id : id, w : "all" },
             campo : "buscar",
             elem_r : {
                 tag : "ul",
                 simbol : ".",
                 nombre : "opciones"
             },
             key : 0
             ,
             pars : "" ,
             form : obj,
             left : ( parseInt( obj.css("width") ) * -1 ) +"px",
             top: "20px",
             width: ( parseInt( obj.find("input:first").css("width") ) + 7 ) + "px",
             border:"1px solid rgb(3,3,3)",
             form_name : obj.attr("name"),
             success: function(json){

                 this.pars = par;

                 var cliens = "";


                 if(json.result)
                     if(json.length > 0) {

                         cliens += "<h1 class='h1-desc' style='background: #f5f5f5;color:#000;font-weight:bolder;text-align: left; padding: 5px 5px; border-bottom: 1px solid #333; margin-bottom: 5px;'>"+fil+"</h1>";


                          for(var i = 0 ; i < json.length ; i++)
                             cliens += "<li ><a href='#' style='font-size: 14px !important;'>" +
                                 "<ul>" +
                                 "<li class='nombre'>"+json.result[i].nombre+"</li>" +
                                 "<li class='detalles'>"+json.result[i].empresa+" "+json.result[i].dir+", "+json.result[i].tel+"</li>" +
                                 "<div class='clear'></div> </ul><div class='clear'></div> " +
                                 "</a></li>" ;



                       var label = this.pars.form.find("label:first") ,
                           es = this.pars.elem_r.simbol.indexOf(".") != -1 ? "class" : "id";

                        label.css({position: "relative !important"});


                     if(!c_el && json.length == 0){

                        label.append("<"+this.pars.elem_r.tag+" "+es+"="+this.pars.elem_r.nombre +" ></"+this.pars.elem_r.tag+">");
                        c_el = true;
                        w_res = $(this.pars.form).find(this.pars.elem_r.tag+this.pars.elem_r.simbol+this.pars.elem_r.nombre);


                     }else if(json > 0){

                         label.append("<"+this.pars.elem_r.tag+" "+es+"="+this.pars.elem_r.nombre +" ></"+this.pars.elem_r.tag+">");
                         c_el = true;
                         w_res = $(this.pars.form).find(this.pars.elem_r.tag+this.pars.elem_r.simbol+this.pars.elem_r.nombre);


                     }else{

                         label.append("<"+this.pars.elem_r.tag+" "+es+"="+this.pars.elem_r.nombre +" ></"+this.pars.elem_r.tag+">");
                         c_el = true;
                         w_res = $(this.pars.form).find(this.pars.elem_r.tag+this.pars.elem_r.simbol+this.pars.elem_r.nombre);

                     }



                       w_res.css({left:this.pars.left,top:this.pars.top,width:this.pars.width,border:this.pars.border});

                        w_res.html(cliens);




                     }else{

                         texto = 0;
                         cliens += "<h1 class='h1-desc' style='background: #f5f5f5;color:#000;font-weight:bolder;text-align: left; padding: 5px 5px; border-bottom: 1px solid #333; margin-bottom: 5px;'>"+fil+" 0 resultados</h1>";

                         if(c_el)
                             w_res.html(cliens);
                         else{
                             var label = this.pars.form.find("label") ,
                                 es = this.pars.elem_r.simbol.indexOf(".") != -1 ? "class" : "id";
                             label.css({position: "relative !important"});
                             label.append("<"+this.pars.elem_r.tag+" "+es+"="+this.pars.elem_r.nombre +" ></"+this.pars.elem_r.tag+">");
                             c_el = true;
                             w_res = $(this.pars.form).find(this.pars.elem_r.tag+this.pars.elem_r.simbol+this.pars.elem_r.nombre);

                             w_res.css({left:this.pars.left,top:this.pars.top,width:this.pars.width,border:this.pars.border});

                             w_res.html(cliens);

                         }

                     }

             }

         };



      if(params)
         $.extend(this.params,params.params);

      this.ini = function(params){

         var params = this.params;

          var obj = this.params.form.find("input[name='" + this.params.campo + "']");

          this.params.data.filt = obj.val();

          this.params.form.attr("action", "javascript:void(0)");

          obj.bind("click",function(){

              var el = $("html").find("form ul.opciones");

              if (el.length > 0){
                  el.remove();
                  c_el = false;
              }

          });


          obj.bind("keyup", function (e) {


              switch (e.keyCode) {

                  case 27 :
                      obj.val("");
                      texto = 0 ;
                      break;

                  case 17 :

                      comand += 17;

                      break;

                  case 86 :

                      comand += 86;

                      break;

              }


              if(comand == 103){

                  var filter = $(this).val().replace("'","");
                  filter = $(this).val().replace("=","");
                  filter = $(this).val().replace('"',"");
                 params.data.filt = filter;
                  texto = 0;

                 buscar(params);
                  comand = 0;
                  return;

              }


              if (!/\w/.test($(this).val())) {

                  texto = 0;

                  if (c_el) {

                      w_res.remove();
                      c_el = false;

                  }

                  return;

              }


              if (texto > 2 && /\w/.test(obj.val())) {

                  var filter = $(this).val().replace("'","");
                  filter = $(this).val().replace("=","");
                  filter = $(this).val().replace('"',"");

                  params.data.filt = filter;

                  buscar(params);

              }

              texto++;

          });

          $("html").bind("keyup", function (e) {


              if( e.keyCode == 27 && $( this.params.form.find("ul.opciones").length > 0 ) )
              {
                this.params.form.find("ul.opciones").remove();
                  c_el = false;
              }


          });

          if(this.params.form.find("div.arr_d ul li").length > 0 ){
              this.params.form.find("div.arr_d ul li ").bind("click",function(){



                  temp.removeClass("act");

                  $(this).addClass("act");

                  switch($(this).find("a").text().toLowerCase()){

                      case "clientes" :

                          params.data.id = 2;

                          break;

                      case "facturas" :

                          params.data.id = 3;

                          break;


                  }

                  temp = $(this);

              });
          }

          cond = true; key++;

      };



      var  buscar = function(params){

             this.params = params;


             ajax({
                 url: params.url,
                 data:params.data,
                 success:params.success,
                 error:function(error){

                     switch(error.status){

                         case 406 :

                             texto = 0;
                             var cliens = "<h1 class='h1-desc' style='background: #f5f5f5;color:#000;font-weight:bolder;text-align: left; padding: 5px 5px; border-bottom: 1px solid #333; margin-bottom: 5px;'>"+fil+" 0 resultados</h1>";

                             if(c_el)
                                 w_res.html(cliens);
                             else{

                                 var label = this.pars.form.find("label") ,
                                     es = this.pars.elem_r.simbol.indexOf(".") != -1 ? "class" : "id";
                                 label.css({position: "relative !important"});
                                 label.append("<"+this.pars.elem_r.tag+" "+es+"="+pars.elem_r.nombre +" ></"+pars.elem_r.tag+">");
                                 c_el = true;
                                 w_res = $(this.pars.form).find(this.pars.elem_r.tag+this.pars.elem_r.simbol+this.pars.elem_r.nombre);

                                 w_res.css({left:this.pars.left,top:this.pars.top,width:this.pars.width,border:this.pars.border});

                                 w_res.html(cliens);

                             }

                             break;

                     }

                 }
             },this.params);

         };

         this.ini();

     };

     $.fn.bus_json_alt = function(params){

          return new json_bus({ obj : $(this) , params : params});
     };



 })(jQuery);


