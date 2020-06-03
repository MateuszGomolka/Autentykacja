# Autentykacja
## Zawartość dokumentacji
* Główne informacje
* Jak działa?
* Dodatkowe inforamcje
* Zdjęcia
* Użyte technologie
* Jak uruchomić

## Główne informacje

Głównym celem aplikacji jest pomyślne przeprowadzenie procesu logowania się.
	
## Jak działa?

Aplikacja na początku wymaga od użytkownika założenia konta. Po wprowadzeniu prawidłowych i nieużywanych wartości takich jak chociażby adres e-mail pozwala nam utworzyć swoje konto na bazie MongoDB. Dzięki utworzeniu konta możemy pomyślnie zalogować się do aplikacji która przekieruje nas do następnej strony wraz z naszym zaszyfrowanym hasłem.

## Dodatkowe informacje

Aplikacja podczas tworzenia konta wymusza na użytkowniku użycia odpowiedniego adresu e-mail zawierającego symbol "@", a także sprawdza czy podane hasło zawiera przynajmniej 6 znaków.

## Zdjęcia

![Screenshot](1.png)
![Screenshot](2.jpg)
![Screenshot](3.jpg)

## Użyte technologie

- express,
- express-ejs-layouts,
- bcryptjs,
- passport,
- mongoose,
- connect-flash,
- express-session,
- bootstrap 4.5,

## Jak uruchomić
Aby uruchomić projekt, należy zainstalować go lokalnie przy użyciu npm:

```
$ npm install

$ npm start

$ localhost:5000
```
