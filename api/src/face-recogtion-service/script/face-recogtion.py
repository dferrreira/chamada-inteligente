import face_recognition
import os
import json
import sys

def recognize_faces():
    image = face_recognition.load_image_file(sys.argv[1])
    presentes = []

    face_locations = face_recognition.face_locations(image)

    count_faces = len(face_locations)

    face_encodings = face_recognition.face_encodings(image, face_locations)

    BASE_PATH = "./src/face-recogtion-service/img/users/"

    entries = os.listdir(BASE_PATH)

    for entry in entries:
      imagem1 = face_recognition.load_image_file(BASE_PATH + entry)
      referencias = [face_recognition.face_encodings(imagem1)[0]]

      for encoding in face_encodings:
        matches = face_recognition.compare_faces(referencias, encoding)
        if True in matches:
          presentes.append(entry)

      final_presente = []
      for presente in presentes:
        nome_arquivo = presente.split('.')[0]
        final_presente.append(nome_arquivo)
    json_print = final_presente

    obj = {
      "count_faces": count_faces,
     "names": json_print,
     "count_faces_not_detected": count_faces - len(json_print),
      "count_faces_detected": len(json_print)
    }

    print(json.dumps(obj))


recognize_faces()
