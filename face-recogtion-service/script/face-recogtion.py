import face_recognition

image = face_recognition.load_image_file("./img/barack_obama.jpg")

barack_face_encoding = face_recognition.face_encodings(image)[0]

unknown_image = face_recognition.load_image_file("./img/desconhecido.jpg")
unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

results = face_recognition.compare_faces([barack_face_encoding], unknown_encoding)

if results[0] == True:
  print("É o Barack Obama!")
else:
  print("Não é o Barack Obama!")
