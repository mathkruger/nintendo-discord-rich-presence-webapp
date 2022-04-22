platform=$1
arch=$2
npx electron-packager . --platform=$platform --arch=$arch --overwrite nintendo-rich-presence --out out
cd ./out/nintendo-rich-presence-$platform-$arch
mv resources/app/server ./server
sh ../../electron_scripts/clean.sh $platform $arch