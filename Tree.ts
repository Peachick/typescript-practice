const mockList = [
  { id: 1, parentId: null, name: "水果", key: 1 },
  { id: 2, parentId: null, name: "汽车", key: "2" },
  { id: 3, parentId: null, name: "电脑", key: "3" },
  { id: 4, parentId: 1, name: "苹果", key: "4" },
  { id: 5, parentId: 3, name: "MacBook Pro", key: "5" },
  { id: 6, parentId: 1, name: "香蕉", key: "6" },
  { id: 7, parentId: 2, name: "奔驰", key: "7" },
  { id: 8, parentId: 3, name: "HUAWEI matebook", key: "8" },
  { id: 9, parentId: 1, name: "葡萄", key: "9" },
  { id: 10, parentId: null, name: "相机", key: "10" },
  { id: 11, parentId: 10, name: "佳能相机", key: "11" },
  { id: 12, parentId: 2, name: "宝马", key: "12" },
  { id: 13, parentId: null, name: "书籍", key: "13" },
  { id: 14, parentId: 13, name: "理科", key: "14" },
  { id: 15, parentId: 13, name: "文科", key: "15" },
  { id: 16, parentId: 14, name: "数学", key: "16" },
  { id: 17, parentId: 15, name: "文言文", key: "17" },
  { id: 18, parentId: 14, name: "物理", key: "18" },
  { id: 19, parentId: 16, name: "微积分", key: "19" },
]

type Leaf = {
  id: number;
  key: string;
  children: Tree;
  [propName: string]: any;
}

type Tree = Array<Leaf>

type Falsy = false | "" | 0 | null | undefined

const isFalsy = (val: unknown): val is Falsy => !val

/**
 * 根据数据列表生成树结构
 * @param scatteredLeaves 数据源
 * @param parentValue 父级关联的值
 * @param parentKey 父级关联的key
 * @returns 树
 */
function createTree(
  scatteredLeaves,
  parentValue,
  parentKey: string = "parentId"
): Tree {
  if (isFalsy(parentKey)) {
    const error = new Error()
    error.name = '[createTree function]'
    error.message = 'need a not emtry `parentKey` instead: ' + parentKey
    throw error
  }
  const result:Tree = []
  if(Array.isArray(scatteredLeaves)) {
    scatteredLeaves.forEach((rawLeaf, ii) => {
      const fullLeaf: Leaf = {
        ...rawLeaf,
        id: parseInt(rawLeaf.id),
        key: String(rawLeaf.key),
        children: [],
      }
      const { id } = rawLeaf
      const curLeafParentValue = fullLeaf[parentKey]
      if(curLeafParentValue === parentValue) {
        const cloneList = [...scatteredLeaves]
        cloneList.splice(ii, 1)
        fullLeaf.children = createTree(cloneList, id, parentKey)
        result.push(fullLeaf)
      }
    })
  }
  return result
}


/**
 * 获取树的深度 DFS
 * @param tree N叉树结构
 * @returns 树的深度
 */
function getTreeDepth(tree: Tree, childrenKey: string = "children"): number {
  let depth = 0
  tree.forEach((levelTree) => {
    if (levelTree.children) {
      depth = Math.max(depth, getTreeDepth(levelTree.children, childrenKey) + 1)
    } else {
      depth = Math.max(depth, 1)
    }
  })
  return depth
}

function getTreeDepthByBFS(tree: Tree) {
  let depth = 0;
  tree.forEach((levelTree) => {
    depth = Math.max(depth, q(levelTree))
  })

  function q(root) {
    const stask = [root]
    let dep = 0
    const flag:any[] = [];
    while(stask.length) {
      const node = stask.shift()
      node.children.forEach((child) => stask.push(child))
    }
    return dep
  }
  return depth
}


/**
 * 扁平树结构
 * @param tree 树
 * @param orderByKey 排序键
 * @returns 扁平后的数组
 */
function flatTree(tree: Tree, orderByKey:keyof Leaf = 'id'): Array<Leaf> {
  const result: Array<Leaf> = []
  if(Array.isArray(tree)) {
    tree.forEach((levelTree) => {
      const { children } = levelTree
      if (children && children.length) {
        const childLeafs = flatTree(children)
        result.push(levelTree, ...childLeafs)
      } else {
        result.push(levelTree)
      }
    })
  }
  return result.sort((a, b) => a[orderByKey] - b[orderByKey])
}

/**
 * 查找目标节点所在分支
 * @param tree 数据源
 * @param targetValue 目标值
 * @param greedy 贪婪/非贪婪 默认：false
 * @param findKey 查找的key 默认：id
 * @returns Tree
 */
function findBranchOfLeaf(
  tree: Tree,
  targetValue,
  greedy: boolean = false,
  findKey = "id"
): Tree {
  const result: Array<any> = []
  if(Array.isArray(tree)) {
    tree.forEach((levelTree) => {
      if(result.length) return
      if (levelTree[findKey] == targetValue) {
        const cloneLeaf = {
          ...levelTree,
          children: greedy ? [] : levelTree.children
        }
        result.push(cloneLeaf)
      } else {
        const childResult = findBranchOfLeaf(levelTree.children, targetValue, greedy, findKey);
        if (childResult.length) {
          result.push({
            ...levelTree,
            children: [...childResult],
          })
        }
      }
    })
  }
  return result
}

const tree = createTree(mockList, null)
console.log("生成树结构", tree);

const depth = getTreeDepth(tree)
console.log("树的最大深度", depth)

const flatedTree = flatTree(tree)
console.log("扁平树结构", flatedTree)

const queryLeafBranch = findBranchOfLeaf(tree, 14, false)
console.log("节点所在的分支", queryLeafBranch)

