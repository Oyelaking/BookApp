# BookApp
A very simple books app using Sails.js, Angular and BootStrap

Db Structure
-------------

    Objects
    --------
        - author
            - name:string
            - about:string
            - createdAt:datetime
            - updated_at:datetime
        - book
            - title:string
            - description:string
            - genre:model
            - averageRating:float
            - date_published:integer
            - author:model
        - admin
            - name
            - email
            - password
            - created_at
        - bookrating
            - book:model
            - rating:integer
            - user_session:string
        - genre
            - id:string
            - name:string

FrontEnd Section
-----------------
    Functionalities
    ----------------
    1) List all books
        Fields to display
        -------------------
        a Title
        b. Author
        c. Year published
        d. Genre

        Sort list according to:
                - title
                - author
                - year published
                - rating

    2) Search books
        - title
        - author
        - date published
        - rating

    3) View Single book
    4) Rate a book - prevent users from rating books twice
    5) View All authors
    6) View Books by a particular author
    7) View All Genres
    8) View Books In a Genre
    11) Get Similar books: uses genre to search books and sorts by year published in descending order
        Criteria
        ---------
        - genre
        - keyword search
        - similar rating

Pages
------
1. Books List - /books
2. Book view - /book/:bookId
3. Authors list - /authors
4. Author's books - /author/:authorId
5. Genre's list - /genres
6. Genre's books - /genres/:genreId
7. Home - /

