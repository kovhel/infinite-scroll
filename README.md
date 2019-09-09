# GIPHY image search

## How to start
`yarn start` will start dev server and redirect to web page automatically.\
Use `localhost:3000` to open web page manually.
## Development
### Linting
`yarn lint` to check for lint errors/warnings.\
`yarn lint --fix` to fix errors/warnings that can be fixed automatically.
### Testing Unit
`yarn test` to run tests in 'watch' mode.
`yarn test:coverage` will do the same with coverage collected after each run.\
### Testing Manal
Was tested on Chrome(latest), FF(latest)
## Current design
The goal of the design to have re-usable and replaceable parts in order to scale and have ability to improve easily.\
E.g. Image search form gets a method to get an image search service instance without hard dependency on giphy service implementation.
Choice on what service to use should come from config instead of being hard-coded in app component.\
E.g. Grid concept is separated from scrolling logic in order to flexible to replace it with any other implementations and vice a versa.\

Components to re-factor: ImageSearchForm: it takes a few responsibilities: storing items, handling logic for requests(offset, preventing more than 1 request per any given moment)(please, see section 'What can be improved/Infinite scroll'), rendering image(can be a component by itself), rendering switcher(another one).
## What can be improved
### Styles
Current style approach is quite primitive and represented by inline styles for a few components.\
What can be used instead? Currently there is a wide choice e.g. this article on medium describes options\
https://blog.bitsrc.io/5-ways-to-style-react-components-in-2019-30f1ccc2b5b 

###Minimal Core
 -translations: i18n\
 -config file: e.g. to chose what image service to apply
 -error handling: e.g. ErrorBoundary component that can use componentDidCatch to do centralized logging or user notifications
 
 ###Grid
 CSS grid will handle items in the way that if we have 1 'high' item in a row it will create unused space.
 Custom solutions to track how 'packed' is each column and where to place item would look nicer.
 E.g. on giphy web page data attribute is used for tracking children and positioning 'absolute' to place them.
 
 ###Infinite Scroll
 Currently is stateless component just to track if scroll position is 'near' the bottom of the container.
 Threshold is calculated as a half of the visible height of the container.
 This has downsides in case of the small height of the container: loading performed quite 'late' so user still can see 'Loading...' label.
 As a solution could depend on 'average' or 'fixed' row height.
 Scroll speed could be taken into account.
 
 **Sure throttling for scroll handler should be applied:)**
 
 Items limit is 'hard-coded' both for first load and next pages loadings.\
 **!important** This can cause an issue for the case when initial height of the container is more than total height of loaded images: scroll won't appear so user won't have any opportunity to load more images.
 As a solution, initial height of the container could be calculated or some bigger limit applied for the first load.
   
 For even more smooth user experience I would track latest row loaded,
 calculate (based on row height) how many rows were scrolled
 and do I have number of loaded rows more or equal buffer size,
 if not trigger load with offset that can be taken
 from data what is latest row loaded with a limit that will be
 min between number of items needed for a buffer and minimal size of request
 (in order to not spam with requests).
 So in this case I would have stateful component that will be able to track offset, limit and other related data with e.g. next interface
 `{rowHeight: number, bufferSize: number, minItemsToLoad: number, load:(limit, offset)=>Promise}`