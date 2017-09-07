# CardDeck
![HelixScrollView](https://raw.githubusercontent.com/Jasbir23/HelixScrollView-React-Native/master/src/assets/husna.gif) <br />

## Card-Deck-React-Native(iOS + Android)
## Props

<table class="table table-bordered">
    <thead>
        <tr>
            <th>Name</th>
            <th>isRequired</th>
            <th>Type</th>
            <th width="50%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>itemCount</td>
            <td>YES</td>
            <td>Integer</td>
            <td>No of card components to be rendered</td>
        </tr>
        <tr>
            <td>renderCard</td>
            <td>YES</td>
            <td>Function callback</td>
            <td>Render card component callback. Carries index of card.</td>
        </tr>
    </tbody>
</table>

## Usage
Find detailed use case in **Examples** section <br />
```
render(){
  return(
    <CardDeck
    itemCount={7}
    style= {{ paddingTop: 200 }}
    renderCard={index => {
      return(
        // return your custom component here
        )
    }} />
  );
}
```

## Check out [Sample Expo App](https://exp.host/@jaezzy23/carddeck)
