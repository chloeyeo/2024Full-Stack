/* create the auth middleware (used in userRouter):
once user logs in isAuth becomes true
then every time user visits a new page this auth middleware
finds token.userId (token that it gets from localStorage
the token that was created when user logged in - every time
user logs in a new create is created and we set token expires in 1hr
so after 1hr the user automatically logs out and that token can no longer be used)
if that token.userId already exists in user database then we have verified
this indeed is an existing logged in user and allow user to be
"continued to be logged in" and thus allow to visit that page user clicked to visit.
if by any chance the token.userId does not exist in db, then the user
will get logged out automatically and will have to log in again to create new token. */
