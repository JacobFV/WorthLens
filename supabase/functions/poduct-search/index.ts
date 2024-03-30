const vision = require('@google-cloud/vision');

async function searchSimilarProducts(file_path, project_id, location, product_set_id) {
  const client = new vision.ProductSearchClient();

  const image_path = file_path;
  const product_set_path = client.productSetPath(project_id, location, product_set_id);

  const content = fs.readFileSync(image_path);
  const request = {
    image: {content: content},
    features: [{type: 'PRODUCT_SEARCH'}],
    imageContext: {
      productSearchParams: {
        productSet: product_set_path,
        productCategories: ['apparel'],
        filter: ''
      }
    }
  };

  const [response] = await client.batchAnnotateImages({requests: [request]});
  const results = response['responses'][0]['productSearchResults']['results'];

  console.log('Similar products found:');
  results.forEach(result => {
    console.log(`Product name: ${result.product.name}`);
    console.log(`Product display name: ${result.product.displayName}`);
    console.log(`Product description: ${result.product.description}`);
    console.log(`Product category: ${result.product.productCategory}`);
    console.log(`Product labels: ${result.product.productLabels}`);
  });
}

// Replace these variables with your own data
const filePath = 'path/to/your/image.jpg';
const projectId = 'your-google-cloud-project-id';
const location = 'us-west1'; // The location of your product set
const productSetId = 'your-product-set-id';

searchSimilarProducts(filePath, projectId, location, productSetId);