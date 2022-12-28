# Pendientes

```javascript
queryClient.setQueryData('productos', (oldData) => {
  if (oldData) {
    // update rows
    let newRows = oldData?.data?.rows.map((p) =>
      p.codigo === data?.data?.query?.codigo ? data?.data?.query : p
    );
    return {
      ...oldData,
      data: { ...oldData.data, rows: newRows },
    };
  } else {
    return null;
  }
});
```
