from flask import Flask, request, jsonify, send_file
from add_text import add_text
from detect_bubbles import detect_bubbles
from process_bubble import process_bubble
from translator import MangaTranslator
from ultralytics import YOLO
from manga_ocr import MangaOcr
from PIL import Image
import numpy as np
import cv2
import io
import os

app = Flask(__name__)

# Constants
MODEL = "model.pt"
VALID_TRANSLATION_METHODS = ["google", "hf", "baidu", "bing"]
VALID_FONTS = {
    "animeace_i": "fonts/animeace_i.ttf",
    "mangati": "fonts/mangati.ttf",
    "ariali": "fonts/ariali.ttf"
}

def process_image(image_array, translation_method="google", font="fonts/animeace_i.ttf"):
    """Process the image and translate text in manga bubbles."""
    results = detect_bubbles(MODEL, image_array)
    manga_translator = MangaTranslator()
    mocr = MangaOcr()
    
    image = np.array(image_array)
    
    for result in results:
        x1, y1, x2, y2, score, class_id = result
        
        detected_image = image[int(y1):int(y2), int(x1):int(x2)]
        im = Image.fromarray(np.uint8((detected_image)*255))
        text = mocr(im)
        
        detected_image, cont = process_bubble(detected_image)
        text_translated = manga_translator.translate(text, method=translation_method)
        image_with_text = add_text(detected_image, text_translated, font, cont)
    
    return image

@app.route('/api/translate', methods=['POST'])
def translate_manga():
    """API endpoint to translate manga images."""
    try:
        # Check if file was uploaded
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Get parameters
        translation_method = request.form.get('translation_method', 'google')
        font_name = request.form.get('font', 'animeace_i')
        
        # Validate parameters
        if translation_method not in VALID_TRANSLATION_METHODS:
            return jsonify({'error': f'Invalid translation method. Must be one of: {VALID_TRANSLATION_METHODS}'}), 400
        
        if font_name not in VALID_FONTS:
            return jsonify({'error': f'Invalid font. Must be one of: {list(VALID_FONTS.keys())}'}), 400
        
        # Read and process the image
        image = Image.open(file.stream)
        image_array = np.array(image)
        
        # Process the image
        processed_image = process_image(
            image_array,
            translation_method=translation_method,
            font=VALID_FONTS[font_name]
        )
        
        # Convert the processed image to bytes
        img = Image.fromarray(processed_image.astype('uint8'))
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        
        return send_file(
            img_byte_arr,
            mimetype='image/png',
            as_attachment=True,
            download_name='translated_manga.png'
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/fonts', methods=['GET'])
def get_fonts():
    """Get available fonts."""
    return jsonify({
        'fonts': list(VALID_FONTS.keys())
    })

@app.route('/api/translation-methods', methods=['GET'])
def get_translation_methods():
    """Get available translation methods."""
    return jsonify({
        'translation_methods': VALID_TRANSLATION_METHODS
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)