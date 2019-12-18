import io, os
from google.cloud import vision


# class analyzer():

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_ROOT = os.path.join(BASE_DIR, "media/products")
    
def detect_labels(new_product):

    path = os.path.join(MEDIA_ROOT, new_product["image"].rsplit('/', 1)[1])
    print(path)
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print('Labels:')

    for label in labels:
        print(label.description)




