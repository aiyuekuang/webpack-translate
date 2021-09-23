import os
import sys
from  utils import OperationJson

os.chdir(os.path.abspath(os.path.join(os.getcwd(), "")))

package = OperationJson(os.path.join(os.getcwd() + "/package.json"))

def getTag():
  return "feature/v"+OperationJson(os.path.join(os.getcwd() + "/package.json")).get_value('version')


tag = getTag()



os.system("git fetch --all")

os.system("git add .")
os.system("git commit -m 机器人自动发布新分支前提交代码")
os.system("git push")


os.system("git checkout master")

os.system("git merge " + tag)

os.system("npm version minor")
os.system("git push origin master")

os.system("git checkout develop")

os.system("git merge master")
os.system("git push origin develop")

os.system("git checkout -b " + getTag())


os.system("git add .")
os.system("git commit -m " + getTag() + "新版本发布")
os.system("git push origin " + getTag())