<h1 align="center">
<br>
	<img src="https://raw.githubusercontent.com/CodeDotJS/instafy/master/media/instafy.png" width="400px">
<br>
	<a href="https://travis-ci.org/CodeDotJS/instafy">
	<img src="https://travis-ci.org/CodeDotJS/instafy.svg?branch=master">
	</a>
	<img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg">
</h1>


<p align="center"><b>A command-line Instagram media and story notifier</b></p>

### Install

```
$ npm install --global instafy
```
__`OR`__
```
$ sudo npm install --global instafy
```

### Preview

<p align="center">
	<img src="media/new.gif">
</p>


### Usage

```
Keep your browser history clean!

Usage   : instafy <username> | [command] <username>

Command :
  -r,  --remove        remove a user from istafy list
  -c,  --clean         clean instafy directory
  -h,  --help          show help

 Example :
   $ instafy 9gag
```

### Workflow

__You need to run the command, twice.__

- When you first run `$ instafy username` ~
	- it initializes the username and saves the current number of posts.

- When you run it for the second time ~
	- compares the current number of locally saved posts with total number of posts uploaded by the user to display the notifications accordingly.
	- displays the number of stories uploaded by the user (if the profile is public)

#### Why?

- I made this tool because of the memes.
- Useless but prevents you from polluting your browser history.
- Before checking user's profile, check if they've uploaded any story or post.
- Script is fast. You can `alias` it to a `keyword` and save it in your `.bashrc` or `.zshrc` profile to make your work easier.

__`Example :`__

```
alias x="instafy username"
```

__`NOTE`__

- In case you think if this tool is missing something, you can file an __[`issue`](https://github.com/CodeDotJS/instafy/issues/new)__ or submit a __[`PR`](https://github.com/CodeDotJS/instafy/pulls)__.

- __`9GAG < Reddit`__

## Related

- __[`instavim`](https://github.com/CodeDotJS/instavim)__ `:` `Command line Instagram media downloader.`
- __[`migger`](https://github.com/CodeDotJS/migger)__ `:` ` Download media from the URL that contains multiple images/videos on Instagram!`
- __[`istalk`](https://github.com/CodeDotJS/instafy)__ `:` `Stalk Instagram users from the command line!`
- __[`instagram-id-of`](https://github.com/CodeDotJS/instagram-id-of)__ `:` `Find UserID of any Instagram user from command line!`
- __[`instagram-profile-picture`](https://github.com/CodeDotJS/instagram-profile-picture)__ `:` `An API to get url to the profile picture and other Instagram medias.`
- __[`instagram-links`](https://github.com/CodeDotJS/Instagram-links)__ `:` `Get links to the publically shared media on Instagram.`

## License

MIT © [Rishi Giri](https://rishi.ml)
