[1mdiff --git a/app/views/events/_event_card.html.slim b/app/views/events/_event_card.html.slim[m
[1mindex a10382a..6a155d3 100644[m
[1m--- a/app/views/events/_event_card.html.slim[m
[1m+++ b/app/views/events/_event_card.html.slim[m
[36m@@ -22,14 +22,14 @@[m [marticle class="flex flex-col text-fgcolor font-source md:flex-row"[m
         = event.description[m
 [m
     address class="flex justify-between items-center overflow-hidden md:flex-[0_1_45%]"[m
[31m-      div class="overflow-hidden flex items-center gap-1 md:block"[m
[32m+[m[32m      div class="flex-[0_1_70%] overflow-hidden flex items-center gap-1 md:block"[m
         /Location label[m
         div class="md:hidden"[m
           svg viewBox="0 0 384 512" class="h-4 fill-fgcolor"[m
             path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"[m
         p class="font-bold not-italic text-lg text-ellipsis overflow-hidden whitespace-nowrap max-md:underline max-md:decoration-dotted"[m
           = venue.name[m
[31m-        p class="hidden md:block text-fgcolor-faded underline decoration-dotted text-ellipsis overflow-hidden whitespace-nowrap"[m
[32m+[m[32m        p class="hidden text-fgcolor-faded underline decoration-dotted text-ellipsis overflow-hidden whitespace-nowrap md:block"[m
           = venue.address[m
 [m
       p class="flex-[0_1_30%] not-italic font-bold text-right md:flex-[0_1_40%] md:text-left"[m
[1mdiff --git a/app/views/events/_events_list.html.slim b/app/views/events/_events_list.html.slim[m
[1mindex 59fc4af..ae7f7cf 100644[m
[1m--- a/app/views/events/_events_list.html.slim[m
[1m+++ b/app/views/events/_events_list.html.slim[m
[36m@@ -2,7 +2,7 @@[m [msection class="max-w-5xl m-auto"[m
 [m
   - @events_days.each do |date, events|[m
 [m
[31m-    section class="mb-24 rounded-lg overflow-hidden md:mb-20"[m
[32m+[m[32m    section class="mb-27 rounded-lg overflow-hidden md:mb-20"[m
       /Day separator "Mercredi 2 juillet"[m
       header class="flex items-center md:pl-16 py-2 mb-1 bg-fgcolor"[m
         h3 class="flex-[1_0_45%] text-center text-bgcolor text-lg font-bold md:text-left"[m
[1mdiff --git a/app/views/layouts/application.html.slim b/app/views/layouts/application.html.slim[m
[1mindex a928557..0f31a92 100644[m
[1m--- a/app/views/layouts/application.html.slim[m
[1m+++ b/app/views/layouts/application.html.slim[m
[36m@@ -22,27 +22,6 @@[m [mhtml class="light"[m
     button.bg-neutral-400 onClick="document.querySelector('html').classList.toggle('dark')"[m
       | DARK/LIGHT[m
 [m
[31m-    /Search & filters bar[m
[31m-    search class="m-4"[m
[31m-      form class="flex flex-col gap-4"[m
[31m-        div class="flex justify-evenly"[m
[31m-          button class="px-2 rounded-md bg-fgcolor text-baro-yellow"[m
[31m-            | Aujourd'hui[m
[31m-          button class="px-2 border-3 rounded-md border-fgcolor"[m
[31m-            | Autour de moi[m
[31m-          svg viewBox="0 0 512 512" class="h-8"[m
[31m-            path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"[m
[31m-        div class="relative rounded-xl overflow-hidden"[m
[31m-          input[[m
[31m-            type="search"[m
[31m-            placeholder="date, ville, mot-clef..."[m
[31m-            class="relative w-full"[m
[31m-          ][m
[31m-          div class="absolute -top-1 right-0 -z-1 bg-fgcolor p-3"[m
[31m-            svg viewBox="0 0 512 512" class="h-6 fill-bgcolor"[m
[31m-              path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"[m
[31m-[m
[31m-        button type="submit" class="bg-neutral-400"[m
[31m-          | Submit[m
[32m+[m[32m    = render "events/search_bar"[m
 [m
     = yield[m
