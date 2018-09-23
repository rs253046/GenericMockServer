tput setaf 3
echo '**********************************'
tput setaf 2
echo building.........
tput setaf 3
echo '**********************************'

tput setaf 7
# tput reset
babel ./bin -d ./build/bin && babel ./src -d ./build/src && babel ./public -d ./build/public && babel ./lib -d ./build/lib && babel ./config -d ./build/config


sleep 5
tput setaf 3

cp ./package.json ./build/package.json
cp ./package-lock.json ./build/package-lock.json
cp ./package.json ./build/package.json
cp -r ./lib/database/__mocks__ ./build/lib/database/__mocks__

tput setaf 3
echo '**********************************'
tput setaf 2
echo Successfully built project dist.
tput setaf 3
echo '**********************************'
tput setaf 7






