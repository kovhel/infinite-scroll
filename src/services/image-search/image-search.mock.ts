export const ImageSearchServiceMock = (() => {
  let resolveGetPromise: Function = () => {};
  return {
    get: jest.fn().mockReturnValue(
      new Promise(resolve => {
        resolveGetPromise = resolve;
      })
    ),
    setSize: jest.fn(),
    resolveGetPromise
  };
})();
