import React, {useState} from 'react';
import {Button, TreeSelect} from 'antd';

const {TreeNode} = TreeSelect;

let loaded = false;

function App() {
    const [value, setValue] = useState(undefined);
    const onChange = (newValue) => {
        alert(newValue);
    };

    const [categoryRoot, setCategoryRoot] = useState("");

    const buildTree = (category) => {
        if (!category) {
            return;
        }
        if (!category.children || category.children.length === 0) {
            return <TreeNode value={category.categoryId} title={category.name} key={category.categoryId}></TreeNode>
        }
        return <TreeNode value={category.categoryId} title={category.name} key={category.categoryId}>
            {category.children.map(childCategory => {
                return buildTree(childCategory);
            })}
        </TreeNode>
    }

    const handlReduxHookBtnClick = () => {
         fetch('http://localhost:8080/')
            .then(response => {
                loaded = true;
                return response.json();
            })
            .then(categoryRoot => {
                if (categoryRoot == null) {
                    return;
                }
                setCategoryRoot(categoryRoot);
                console.log("refresh tree");
            });
    }

    return (
        <>
            <Button type="primary" onClick={handlReduxHookBtnClick}>Redux Hook</Button>
            <TreeSelect
                showSearch
                style={{width: '100%'}}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
            >
                {buildTree(categoryRoot)}
            </TreeSelect>
        </>
    );
}

export default App;
