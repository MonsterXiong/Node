# Prepare
cd docs
rm -rf .vuepress/dist

# Build
vuepress build

# Publish to GitHub Pages
cd .vuepress/dist
git init
git config user.name "MonsterXiong"
git config user.email "942849672@qq.com"
git add -A
git commit -m "deploy"
git push --force "https://${TOKEN}@github.com/MonsterXiong/Node.git" "master:gh-pages"

# Cleanup
cd ../..
rm -rf .vuepress/dist

