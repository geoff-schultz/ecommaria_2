import io, os
from google.cloud import vision
from .models import Product, Category


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_ROOT = os.path.join(BASE_DIR, "media/products")
    
def detect_labels(new_product):
    new_product_id = new_product["url"].rsplit('/', 2)[1]
    path = os.path.join(MEDIA_ROOT, new_product["image"].rsplit('/', 1)[1])
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print('Labels:')

    p = Product.objects.get(id=new_product_id)
    
    for label in labels:
        print(label.description)
        c = Category.objects.filter(name=label.description)
        if len(c) > 0: 
            p.categories.add(c[0])
        else:
            c = Category.objects.create(name=label.description)
            p.categories.add(c)

        





