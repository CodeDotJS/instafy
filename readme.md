<h1 align="center">
<br>
	<img src="https://raw.githubusercontent.com/CodeDotJS/instafy/master/media/instafy.png">
<br>
	<img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg">
	<a href="https://travis-ci.org/CodeDotJS/instafy">
	<img src="https://travis-ci.org/CodeDotJS/instafy.svg?branch=master">
	</a>
</h1>


> :telescope: A command line Instagram media notifier!

<p align="center">
	<img width="500" src="https://raw.githubusercontent.com/CodeDotJS/instafy/master/media/ezgif.com-c89e83e4ef.gif">
</p>

## Why?

- Prevents the users from polluting their browser history.

- Check user's profile in case they have uploaded any new image.

- Less time consumption. You don't have to open Instagram for updates.


## Install

```
$ npm install --global instafy
```
__`OR`__
```
$ sudo npm install --global instafy
```

## Usage

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


__`NOTE :`__

- You've to run the script twice.

When you run `instafy`, it first saves the username and their current number post.
So, when you run it again, it compares the posts count saved earlier from the current one and and notifies you
accordingly.

So, first initialize the users whose post you don't want to miss.
Run `$ instafy <username>` to check wheather they have uploaded any new image.

__`NOTE`__

- In case you think if this tool is missing something, you can file an [issue](https://github.com/CodeDotJS/instafy/issues/new) or submit a [PR](https://github.com/CodeDotJS/instafy/pulls).

- Not tested on Windows and MacOS, but it should work on both of the platform.

## Related

- __[`instavim`](https://github.com/CodeDotJS/instavim)__ `:` `Command line Instagram media downloader.`
- __[`istalk`](https://github.com/CodeDotJS/instafy)__ `:` `Stalk Instagram users from the command line!`
- __[`instagram-id-of`](https://github.com/CodeDotJS/instagram-id-of)__ `:` `Find UserID of any Instagram user from command line!`
- __[`instagram-profile-picture`](https://github.com/CodeDotJS/instagram-profile-picture)__ `:` `An API to get url to the profile picture and other Instagram medias.`
- __[`instagram-links`](https://github.com/CodeDotJS/Instagram-links)__ `:` `Get links to the publically shared media on Instagram.`

## License

MIT © [Rishi Giri](https://rishigiri.com)
