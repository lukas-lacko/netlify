// Define which article is being retrieved
const articleSlug = location.hash.slice(1);

// Create article container
const articleContainer = addToElementbyId('div', 'article', app);


// Call for article info
deliveryClient
  .items()
  .type('article')
  .equalsFilter('elements.url_pattern', articleSlug)
  .queryConfig({
    urlSlugResolver: (link, context) => {
      return resolveUrl(link);
    },
    richTextResolver: (item, context) => {
      return resolveLinkedItems(item);
    }
  })
  .toPromise()
  // Continue as above
  .then(response => {
    console.log(response)
    // Check if article found before adding
    const article =
      response.data.items && response.data.items.length ? response.data.items[0] : undefined;



    // Update title
    document.title = `Clanky | ${article.system.name}`;

    // Create nodes
    const headerImage = createElement(
      'img',
      'article-header',
      'src',
      article.elements.teaser_image.value[0].url
    );
    const title = createElement(
      'h2',
      'article-title',
      'innerText',
      article.elements.title.value
    );
    const richTextElement = article.elements.body_copy;
    const rteResolver = Kk.createRichTextHtmlResolver().resolveRichText({
        element: richTextElement,
        linkedItems: Kk.linkedItemsHelper.convertLinkedItemsToArray(response.data.linkedItems),
        urlResolver: (linkId, linkText, link) => {
          // Your link resolution logic
        },

      });

    const body = createElement(
      'div',
      'article-description',
      'innerHTML',
      rteResolver.html
    );

    const att = document.createAttribute("data-kontent-item-id");
    att.value = article.system.id
    articleContainer.setAttributeNode(att)


    // Add nodes to DOM
    articleContainer.append(headerImage, title, body);
    return;

    // 404 message if not found
    if (!article) {
        app.innerHTML = '<p>That article could not be found.</p>';
        return;
      }
    })
    .catch(err => {
      reportErrors(err);
    });
  // Reload page on hash change
const renderHash = () => {
    window.history.go();
  };
  window.addEventListener('hashchange', renderHash, false);




  