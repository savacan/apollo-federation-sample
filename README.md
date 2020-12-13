# apollo-federation-sample

apollo federationをお試ししてみたrepository

/game  
/review  
/user  
/gateway  

それぞれのディレクトリでapollo serverが立ち上がります。

## 実行
以下の順番で実行することで全て立ち上がります。
細かいところは読んでいただけるとありがたいですー。

`npm run i-all`  
`npm run start-services`  
`npm run start-gateway`  

## command

しっかり組んでいないですが、とりあえずrootディレクトリで以下のnpm scriptsが利用可能です。

- `start-gateway`: gatewayの起動
- `start-services`: serviceをまとめて起動
- `i-all`: まとめてnpm install
- `start:user`: user serviceの単体起動
- `start:game`: game serviceの単体起動
- `start:review`: review serviceの単体起動
- `i:gateway`: gatewayのnpm install
- `i:user`: userのnpm install
- `i:game`: gameのnpm install
- `i:review`: reviewのnpm install
