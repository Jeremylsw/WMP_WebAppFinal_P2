This README contains program logic not described in the assignment doc

1) After AJAX GET call, data is archived in localStorage if (1) no entry found or (2) last update date different
2) For map display origin, random number genereated for each named entry. 
   Ideally should have correct origin based on country name but not requirement of assignment
3) Listing entry created by assigning incremental index as id to all elements in Listing
4) If any part of the element in listing clicked, id returned, logged to localStorage and move to next page
5) Notification format should be in PACKAGENAME:TEXT for text to be updated in notifications table. Else push notif msg will be ignored

Demo process:
1) Basic requirements
   - Listing
   - Page transitions
   - Map add remove markers
   - Map markers persistent cross page traversal
   - Offline caching
   - Notifications popup, click to open page
2) Additional 
   - Remove all map pointers
   - Remove all notifications
   - Validation of notifs, show up on specific page only