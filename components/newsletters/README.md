# Newsletters

Output signup forms for the Sailthru-powered newsletters.

The signups on the site hit a custom endpoint at the WP-JSON API, /newsletter/amp-signup/$list
That API endpoint then POSTs the data to the public Sailthru form, https://cb.sailthru.com/s/6i4/$list
We presently do not capture any custom vars. Only the email address.

Sailtru-hosted management pages:
https://link.news.inews.co.uk/join/6i4/signup
http://link.news.inews.co.uk/manage/6i4/preferences?email=foo@bar.com
http://link.news.inews.co.uk/manage/6i4/optout?email=foo@bar.com
http://link.news.inews.co.uk/page/6i4/confirm?email=foo@bar.com

