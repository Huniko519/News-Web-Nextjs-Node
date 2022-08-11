# Analytics

We host various analytics trackers across WWW and AMP. Each director corresponds to a different tracker and each have a WWW and an AMP tracker.

## Comscore

Simple Comscore beacon.js with the property ID of 6034964. This may be deprecated soon.

## Google Analytics

Google Analytics revolves primarily around CustomDimensions that are numbered and represent different values of the page like topCategory or Author name.
Pages pass their page objects into the `Utils.getCustomDimensions()` to generate these dimensions
They uses gtag and sets custom event handlers for things like share buttons and video player events.

## Ipsos

## RTA

The MOL Real Time Analytics system. The tracker is a full library that we initial with additional parameters like article authors and topics.
