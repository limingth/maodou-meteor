# 毛豆网移动版

# maodou
maodou mobile version

## Commit Log
* Version 0.1 
  - Initial commit with a welcome msg
* Version 0.2 
  - Add a simple email/password log in feature
* Version 0.3
  - Add user delete his own account feature

## How to run 
* git clone https://github.com/limingth/maodou.git
* nohup meteor 


## forward-port-80-to-port-3000
* https://coderwall.com/p/plejka/forward-port-80-to-port-3000

```
# localhost/loopback
sudo iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRECT --to-ports 3000

# external
sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
```
