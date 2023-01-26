// Define main container
const app = document.getElementById('app');

// Function for creating and appending elements
const addToElementbyId = (elementType, id, parent) => {
  const element = document.createElement(elementType);
  element.setAttribute('id', id);
  parent.appendChild(element);
  return element;
};

// Set up Delivery client
const Kk = window['kontentDelivery'];
const deliveryClient = new Kk.createDeliveryClient({
  projectId: '30038607-b791-0092-d8d3-4a9a800664bf',
  previewApiKey: 'ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogImYxMjlhZTFkNDk5NTQzZmVhNzk0N2M4MTUzZTFhZjFkIiwNCiAgImlhdCI6ICIxNjcxMTg5MDgzIiwNCiAgImV4cCI6ICIyMDE2Nzg5MDgzIiwNCiAgInZlciI6ICIxLjAuMCIsDQogICJwcm9qZWN0X2lkIjogIjMwMDM4NjA3Yjc5MTAwOTJkOGQzNGE5YTgwMDY2NGJmIiwNCiAgImF1ZCI6ICJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSINCn0.GOx3Q7f6rkbxJViI_a6Cwlx8xap9QsGnYhxkmL7HQxc',
  defaultQueryConfig: {
    usePreviewMode: true, // Queries the Delivery Preview API.
  }
  
});

// Function for adding elements to DOM with specific attributes
const createElement = (elementType, classToAdd, attribute, attributeValue) => {
    const element = document.createElement(elementType);
    element.setAttribute('class', classToAdd);
  
    // Set attribute value based on the attribute required
    attribute === 'href'
      ? (element.href = attributeValue)
      : attribute === 'innerHTML'
      ? (element.innerHTML = attributeValue)
      : attribute === 'innerText'
      ? (element.innerText = attributeValue)
      : attribute === 'src'
      ? (element.src = attributeValue)
      : undefined;
  
    return element;
  };

// Error messages
const reportErrors = err => {
    console.error(err);
    app.innerHTML = `<p>An error occured 😞:</p><p><i>${err}</i></p>`;
  };